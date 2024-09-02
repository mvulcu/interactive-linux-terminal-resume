const output = document.getElementById('output');
const input = document.getElementById('input');
const prompt = document.getElementById('prompt');
const monitor = document.getElementById('monitor');
const screen = document.getElementById('screen');
const loadingScreen = document.getElementById('loading');

let currentDirectory = '~';

// Commands for autocompletion
const commands = ['cal', 'cat', 'cd', 'date', 'echo', 'find', 'help', 'logname', 'ls', 'pwd', 'uname', 'who', 'clear'];

// Function to type commands with a delay
function typeCommand(command, index = 0) {
    if (index < command.length) {
        input.value += command[index];
        setTimeout(() => typeCommand(command, index + 1), 150);
    } else {
        setTimeout(() => {
            executeCommand(command);
            input.value = '';
            if (command === 'cd maria') {
                setTimeout(() => typeCommand('ls'), 1000);
            } else if (command === 'ls') {
                setTimeout(() => typeCommand('help'), 1000);
            }
        }, 500);
    }
}

// Hide loading screen after a delay and then start typing commands
setTimeout(() => {
    loadingScreen.style.display = 'none';
    monitor.style.opacity = '1';
    setTimeout(() => {
        typeCommand('cd maria');
    }, 500);
}, 2000); // 4 seconds delay

const fileSystem = {
    '~': {
        type: 'directory',
        contents: ['maria']
    },
    '~/maria': {
        type: 'directory',
        contents: ['certificates', 'projects', 'personal', 'cv']
    },
    '~/maria/certificates': {
        type: 'directory',
        contents: ['web_development.pdf', 'python_advanced.pdf', 'machine_learning_basics.pdf']
    },
    '~/maria/projects': {
        type: 'directory',
        contents: ['portfolio_website', 'machine_learning_model', 'e_commerce_platform']
    },
    '~/maria/personal': {
        type: 'directory',
        contents: ['hobbies.txt', 'goals.txt', 'bucket_list.md']
    },
    '~/maria/cv': {
        type: 'file',
        content: `This is Maria's CV content.`
    },
    '~/maria/certificates/web_development.pdf': {
        type: 'file',
        content: `Web Development Certificate`
    },
    '~/maria/certificates/python_advanced.pdf': {
        type: 'file',
        content: `Python Advanced Certificate`
    },
    '~/maria/certificates/machine_learning_basics.pdf': {
        type: 'file',
        content: `Machine Learning Basics Certificate`
    },
    '~/maria/projects/portfolio_website': {
        type: 'file',
        content: `Details about Maria's portfolio website project.`
    },
    '~/maria/projects/machine_learning_model': {
        type: 'file',
        content: `Details about Maria's machine learning model project.`
    },
    '~/maria/projects/e_commerce_platform': {
        type: 'file',
        content: `Details about Maria's e-commerce platform project.`
    },
    '~/maria/personal/hobbies.txt': {
        type: 'file',
        content: `Maria's hobbies: reading, hiking, painting.`
    },
    '~/maria/personal/goals.txt': {
        type: 'file',
        content: `Maria's goals: Learn a new language, travel the world, develop a successful project.`
    },
    '~/maria/personal/bucket_list.md': {
        type: 'file',
        content: `Maria's bucket list: Skydiving, Scuba diving, Visit Japan.`
    }
};

function getPrompt() {
    return `user@linux:${currentDirectory}$`;
}

function updatePrompt() {
    prompt.textContent = getPrompt();
}

function highlightSyntax(cmd) {
    const parts = cmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    let highlighted = `<span class="command">${command}</span>`;
    args.forEach(arg => {
        if (arg.startsWith('-')) {
            highlighted += ` <span class="argument">${arg}</span>`;
        } else if (fileSystem[`${currentDirectory}/${arg}`]) {
            const type = fileSystem[`${currentDirectory}/${arg}`].type;
            highlighted += ` <span class="${type}">${arg}</span>`;
        } else {
            highlighted += ` ${arg}`;
        }
    });

    return highlighted;
}

function executeCommand(cmd) {
    output.innerHTML += `${getPrompt()} ${highlightSyntax(cmd)}\n`;
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
        case 'cal':
            showCalendar();
            break;
        case 'cat':
            catFile(args);
            break;
        case 'cd':
            changeDirectory(args[0]);
            break;
        case 'date':
            showDate();
            break;
        case 'echo':
            echoText(args);
            break;
        case 'find':
            findFile(args);
            break;
        case 'logname':
            showLogname();
            break;
        case 'ls':
            listDirectory(args);
            break;
        case 'pwd':
            showPwd();
            break;
        case 'uname':
            showUname(args);
            break;
        case 'who':
            showWho(args);
            break;
        case 'clear':
            output.innerHTML = '';
            break;
        case 'help':
            showHelp(args);
            break;
        default:
            output.innerHTML += `<span class="error">Command not found: ${command}. Type 'help' for available commands.</span>\n`;
    }
    updatePrompt();
    autoScroll();
}

function autoScroll() {
    screen.scrollTop = screen.scrollHeight;
}

function showCalendar() {
    const calendar = `    September 2024    
Mo Tu We Th Fr Sa Su  
 2  3  4  5  6  7  1  
 9 10 11 12 13 14  8  
16 17 18 19 20 21 15  
23 24 25 26 27 28 29  
30 31`;
    output.innerHTML += `${calendar}\n`;
}

function catFile(args) {
    const filename = args.find(arg => !arg.startsWith('-'));
    const filePath = `${currentDirectory}/${filename}`;
    if (fileSystem[filePath] && fileSystem[filePath].type === 'file') {
        let content = fileSystem[filePath].content;
        if (args.includes('-n')) {
            content = content.split('\n').map((line, index) => `${index + 1} ${line}`).join('\n');
        }
        if (args.includes('-E')) {
            content = content.replace(/$/gm, '$');
        }
        output.innerHTML += `<span class="success">${content}</span>\n`;
    } else {
        output.innerHTML += `<span class="error">cat: ${filename}: No such file</span>\n`;
    }
}

function changeDirectory(dir) {
    if (!dir || dir === '~') {
        currentDirectory = '~';
    } else if (dir === '..') {
        if (currentDirectory !== '~') {
            currentDirectory = currentDirectory.split('/').slice(0, -1).join('/');
        }
    } else {
        const newPath = `${currentDirectory}/${dir}`;
        if (fileSystem[newPath] && fileSystem[newPath].type === 'directory') {
            currentDirectory = newPath;
        } else {
            output.innerHTML += `<span class="error">cd: ${dir}: No such directory</span>\n`;
        }
    }
}

function showDate() {
    const currentDate = new Date();
    output.innerHTML += `${currentDate.toString()}\n`;
}

function echoText(args) {
    output.innerHTML += `${args.join(' ')}\n`;
}

function findFile(args) {
    const path = currentDirectory;
    let results = [];

    if (args.includes('-name')) {
        const pattern = args[args.indexOf('-name') + 1];
        results = searchFileSystem(path, pattern);
    } else if (args.includes('-type')) {
        const type = args[args.indexOf('-type') + 1];
        results = searchFileSystem(path, '', type);
    } else if (args.includes('-size')) {
        // Simulating size search (this is a mock implementation)
        output.innerHTML += `<span class="error">find: -size not implemented in this mock environment.</span>\n`;
        return;
    }

    if (results.length) {
        output.innerHTML += results.join('\n') + '\n';
    } else {
        output.innerHTML += `<span class="error">find: No files found</span>\n`;
    }
}

function searchFileSystem(currentPath, pattern, type) {
    const results = [];
    const search = (path) => {
        const contents = fileSystem[path].contents || [];
        contents.forEach(item => {
            const itemPath = `${path}/${item}`;
            const itemType = fileSystem[itemPath].type;

            if ((!type || itemType.startsWith(type)) && (!pattern || item.includes(pattern))) {
                results.push(itemPath.replace('~', ''));
            }

            if (itemType === 'directory') {
                search(itemPath);
            }
        });
    };
    search(currentPath);
    return results;
}

function showLogname() {
    output.innerHTML += `user\n`;
}

function listDirectory(args) {
    let targetDir = currentDirectory;

    // Check if directory is specified
    const specifiedDir = args.find(arg => !arg.startsWith('-'));
    if (specifiedDir) {
        const newPath = `${currentDirectory}/${specifiedDir}`.replace(/\/+/g, '/');
        if (fileSystem[newPath] && fileSystem[newPath].type === 'directory') {
            targetDir = newPath;
        } else {
            output.innerHTML += `<span class="error">ls: cannot access '${specifiedDir}': No such directory</span>\n`;
            return;
        }
    }

    const contents = fileSystem[targetDir].contents;
    let listing = '';
    let showHidden = args.includes('-a');
    let longFormat = args.includes('-l');
    let humanReadable = args.includes('-h') && longFormat;

    contents.forEach(item => {
        if (!showHidden && item.startsWith('.')) return;

        if (longFormat) {
            const itemPath = `${targetDir}/${item}`;
            const itemType = fileSystem[itemPath] ? fileSystem[itemPath].type : 'unknown';
            const size = humanReadable ? '1K' : '1024';
            const modifiedTime = 'Sep  1 12:34';

            listing += `${itemType === 'directory' ? 'd' : '-'}rwxr-xr-x 1 user group ${size} ${modifiedTime} ${item}\n`;
        } else {
            listing += `<span class="${fileSystem[`${targetDir}/${item}`].type}">${item}</span>  `;
        }
    });

    output.innerHTML += listing + '\n';
}

function showPwd() {
    output.innerHTML += `${currentDirectory.replace('~', '/home/user')}\n`;
}

function showUname(args) {
    const systemInfo = {
        '-a': 'Linux mysystem 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux',
        '-r': '5.4.0-42-generic',
    };
    const outputText = args.length ? systemInfo[args[0]] : 'Linux';
    output.innerHTML += `${outputText}\n`;
}

function showWho(args) {
    const users = 'user    pts/0        Sep  2 10:00 (:0)\n';
    if (args.includes('-H')) {
        output.innerHTML += `NAME     LINE         TIME             COMMENT\n`;
    }
    output.innerHTML += `${users}`;
    if (args.includes('-u')) {
        output.innerHTML += `user    pts/0        Sep  2 10:00 00:01   . (:0)\n`;
    }
}

function showHelp(args) {
    if (args.length > 0) {
        const commandHelp = {
            cal: "cal: Displays a simple calendar.\nNo additional options.",
            cat: `cat: Concatenates and displays files.\n
Options:
-n: Number all output lines.
-E: Display $ at end of each line.`,
            cd: "cd: Change the current directory.\nNo additional options.",
            date: "date: Displays or sets the date and time.\nNo additional options.",
            echo: "echo: Displays a line of text.\nNo additional options.",
            find: `find: Search for files in a directory hierarchy.\n
Options:
-name <pattern>: Search by filename.
-type <type>: Search by file type (f for files, d for directories).
-size <size>: Search by file size.`,
            help: "help: Display information about builtin commands.\nNo additional options.",
            logname: "logname: Prints the name of the current user.\nNo additional options.",
            ls: `ls: Lists directory contents.\n
Options:
-l: Long listing format.
-a: Include directory entries whose names begin with a dot (.).
-h: Print sizes in human readable format (e.g., 1K 234M 2G).`,
            pwd: "pwd: Print the name of the current working directory.\nNo additional options.",
            uname: `uname: Print system information.\n
Options:
-a: Print all information.
-r: Print the kernel release.`,
            who: `who: Show who is logged on.\n
Options:
-u: Show idle time.
-H: Display column headers.`,
        };
        output.innerHTML += commandHelp[args[0]] || `<span class="error">No help entry for ${args[0]}</span>\n`;
    } else {
        output.innerHTML += `
Available commands:
<span class="command">cal</span> - Displays a calendar.
<span class="command">cat</span> [options] [file] - Concatenates and displays files.
<span class="command">cd</span> [directory] - Change directory.
<span class="command">date</span> - Display or set the system date and time.
<span class="command">echo</span> [text] - Display a line of text.
<span class="command">find</span> [path] [options] - Search for files in a directory hierarchy.
<span class="command">logname</span> - Print the current user's name.
<span class="command">ls</span> [options] [directory] - List directory contents.
<span class="command">pwd</span> - Print the name of the current working directory.
<span class="command">uname</span> [options] - Print system information.
<span class="command">who</span> [options] - Show who is logged on.
<span class="command">clear</span> - Clear the terminal screen.
<span class="command">help</span> [command] - Display information about builtin commands.

The Tab key is your way of telling Linux to finish the current word you are typing, if possible. 
If there is only one match, it will complete the name. 
If there are multiple matches, press Tab again to see the options.
    `;
    }
}

function autocompleteInput() {
    const inputValue = input.value.trim();
    const inputParts = inputValue.split(' ');
    const lastPart = inputParts[inputParts.length - 1];

    // Handle command autocompletion
    if (inputParts.length === 1) {
        const matches = commands.filter(cmd => cmd.startsWith(lastPart));
        if (matches.length === 1) {
            input.value = matches[0] + ' ';
        } else if (matches.length > 1) {
            // Multiple matches, suggest options
            output.innerHTML += matches.join(' ') + '\n';
        }
    } else {
        // Handle directory and file autocompletion
        const currentDir = fileSystem[currentDirectory].contents;
        const matches = currentDir.filter(item => item.startsWith(lastPart));
        if (matches.length === 1) {
            input.value = inputParts.slice(0, -1).join(' ') + ' ' + matches[0];
        } else if (matches.length > 1) {
            // Multiple matches, suggest options
            output.innerHTML += matches.join(' ') + '\n';
        }
    }
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault();
        autocompleteInput();
    }
});

input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const cmd = this.value;
        executeCommand(cmd);
        this.value = '';
        autoScroll();
    }
});

// Initial commands after loading
updatePrompt();
