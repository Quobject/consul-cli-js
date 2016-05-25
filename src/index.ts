import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as child_process from 'child_process';
import * as os from 'os';
import { cliTable2Json } from 'cli-table-2-json';
const exec = child_process.exec;



const infoLines2Json = function (lines) {
  let result = {};

  let header = false;
  let header2 = '';

  lines.forEach(function (line) {

    //debug(line);
    if (_.endsWith(line, ':')) {
      header2 = line.substring(0, line.length - 1);
      header = true;
      //debug('header', header);
      result[header2] = {};
    } else if (header) {
      //debug('not header');
      const parts = line.trim().split('=');
      const key = parts[0].trim();
      let value = parts[1] ? parts[1].trim() : '';
      if (key.length > 0) {
        if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        } else if (value !== '' && !isNaN(value)) {
          value = parseInt(value, 10);
        }
        result[header2][key] = value;
      }
    }

  });
  return result;

};


const extractResult = function (result) {

  const extracterArray = [
    {
      re: / members /,
      run: function (resultp) {
        const lines = resultp.raw.split(os.EOL);
        resultp.members = cliTable2Json(lines);
        resultp.allMembersAlive = true;

        resultp.members.forEach(function (member) {
          if (member.status !== 'alive') {
            resultp.allMembersAlive = false;
          }
        });

        return resultp;
      },
    },
    {
      re: / join /,
      run: function (resultp) {
        const line = resultp.raw.trim();
        resultp.line = line;
        resultp.success = _.startsWith(line, 'Successfully');

        return resultp;
      },
    },
    {
      re: / info /,
      run: function (resultp) {
        const lines = resultp.raw.split(os.EOL);
        resultp.lines = lines;
        resultp.info = infoLines2Json(lines);

        return resultp;
      },
    },


  ];


  extracterArray.forEach(function (extracter) {
    const re = extracter.re;
    const str = result.command;
    let m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      return extracter.run(result);
    }
  });

  return result;
};



export class Consul {

  constructor(private options: IOptions = new Options()) { }

  public command(command: string, commandEnd = '', callback?: (err, data) => void) {
    let ansiblePlaybook = this;
    const params = this.options.toParams();
    let execCommand = `consul ${command} ${params} ${commandEnd}`;

    return Promise.resolve().then(function () {
      //console.log('execCommand =', execCommand);

      let execOptions = {
        cwd: ansiblePlaybook.options.currentWorkingDirectory,
        env: {
          DEBUG: '',
          HOME: process.env.HOME,
          PATH: process.env.PATH,
        },
        maxBuffer: 200 * 1024 * 1024,
      };

      //console.log('exec options =', execOptions);

      return new Promise(function (resolve, reject) {
        exec(execCommand, execOptions, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
          }
          //console.log(`stdout: ${stdout}`);
          resolve({ stdout: stdout });
        });
      });
    }).then(function (data: { stdout: string }) {

      let result = {
        command: execCommand,
        raw: data.stdout,
      };
      return extractResult(result);

    }).nodeify(callback);
  }
}


export interface IOptions {
  rpcAddr?: string;
  currentWorkingDirectory?: string;
  toParams(): string;
}


export class Options implements IOptions {
  public constructor(public rpcAddr?: string, public currentWorkingDirectory?: string) { }

  public toParams(): string {
    const params = Object.keys(this).reduce((previousValue, key) => {
      if (key === 'currentWorkingDirectory') {
        return previousValue;
      }
      const value = this[key];
      const key2 = _.snakeCase(key).replace('_', '-');
      return `${previousValue} --${key2} ${value}`;
    }, '');

    return params;
  }
}

