"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const nodeify_ts_1 = __importDefault(require("nodeify-ts"));
const child_process = __importStar(require("child_process"));
const os = __importStar(require("os"));
const cli_table_2_json_1 = require("cli-table-2-json");
const exec = child_process.exec;
const infoLines2Json = function (lines) {
    const result = {};
    let header = false;
    let header2 = '';
    lines.forEach(function (line) {
        //debug(line);
        if (_.endsWith(line, ':')) {
            header2 = line.substring(0, line.length - 1);
            header = true;
            //debug('header', header);
            result[header2] = {};
        }
        else if (header) {
            //debug('not header');
            const parts = line.trim().split('=');
            const key = parts[0].trim();
            let value = parts[1] ? parts[1].trim() : '';
            if (key.length > 0) {
                if (value === 'true') {
                    value = true;
                }
                else if (value === 'false') {
                    value = false;
                }
                else if (value !== '' && !isNaN(value)) {
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
            run(resultp) {
                const lines = resultp.raw.split(os.EOL);
                resultp.members = cli_table_2_json_1.cliTable2Json(lines);
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
            run(resultp) {
                const line = resultp.raw.trim();
                resultp.line = line;
                resultp.success = _.startsWith(line, 'Successfully');
                return resultp;
            },
        },
        {
            re: / info /,
            run(resultp) {
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
        // tslint:disable-next-line:no-conditional-assignment
        if ((m = re.exec(str)) !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            return extracter.run(result);
        }
    });
    return result;
};
class Consul {
    constructor(options = new Options()) {
        this.options = options;
    }
    command(command, commandEnd = '', callback) {
        const ansiblePlaybook = this;
        const params = this.options.toParams();
        const execCommand = `consul ${command} ${params} ${commandEnd}`;
        const promise = Promise.resolve().then(function () {
            //console.log('execCommand =', execCommand);
            const execOptions = {
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
                        const message = `error: '${error}' stdout = '${stdout}' stderr = '${stderr}'`;
                        console.error(message);
                        reject(message);
                    }
                    //console.log(`stdout: ${stdout}`);
                    resolve({ stdout });
                });
            });
        }).then(function (data) {
            const result = {
                command: execCommand,
                raw: data.stdout,
            };
            return extractResult(result);
        });
        return nodeify_ts_1.default(promise, callback);
    }
}
exports.Consul = Consul;
class Options {
    constructor(httpAddr, currentWorkingDirectory) {
        this.httpAddr = httpAddr;
        this.currentWorkingDirectory = currentWorkingDirectory;
    }
    toParams() {
        const params = Object.keys(this).reduce((previousValue, key) => {
            if (key === 'currentWorkingDirectory') {
                return previousValue;
            }
            const value = this[key];
            const key2 = _.snakeCase(key).replace('_', '-');
            return `${previousValue} -${key2} ${value}`;
        }, '');
        return params;
    }
}
exports.Options = Options;
//# sourceMappingURL=main.js.map