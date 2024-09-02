# Interactive Linux Terminal Resume

![Screenshot](https://your-image-link.com/screenshot.png)

An interactive web-based Linux terminal emulator that serves as an innovative and engaging way to showcase a resume. This project simulates a Linux terminal environment where users can navigate through directories, view files, and execute commands that reveal different aspects of a resume.

## Features

- **Interactive Terminal**: Fully functional terminal that accepts various Linux-like commands.
- **Customizable Resume Content**: The terminal allows you to display resume content like certificates, projects, personal goals, and more.
- **Dynamic Calendar**: View the current month's calendar starting with Monday.
- **Command Autocompletion**: Use the Tab key to autocomplete commands and file names.
- **File System Simulation**: A simulated file system structure where users can navigate using standard commands like `ls`, `cd`, `cat`, and others.

## Available Commands

- `cal`: Displays a calendar of the current month starting with Monday.
- `cat [filename]`: Concatenates and displays the content of a file. Supports options like `-n` to number lines and `-E` to show `$` at the end of each line.
- `cd [directory]`: Changes the current directory.
- `date`: Displays the current date and time.
- `echo [text]`: Outputs the text to the terminal.
- `find [path] [options]`: Searches for files within directories. Supports options like `-name`, `-type`, and `-size`.
- `logname`: Displays the current logged-in user's name.
- `ls [options] [directory]`: Lists the contents of a directory. Supports options like `-l` for long listing, `-a` to show hidden files, and `-h` for human-readable file sizes.
- `pwd`: Displays the current working directory.
- `uname [options]`: Prints system information. Supports options like `-a` for all information and `-r` for kernel version.
- `who [options]`: Shows who is logged on the system. Supports options like `-u` for idle time and `-H` for displaying headers.
- `clear`: Clears the terminal screen.
- `help [command]`: Displays help information for the specified command.

## How to Use

1. **Navigate**: Start by typing `ls` to view the available directories and `cd [directory]` to change directories.
2. **Explore**: Use commands like `cat` to read files, `find` to search for specific files, and `echo` to output text.
3. **Help**: Type `help` to see the list of available commands or `help [command]` to get more information about a specific command.

## Installation

You can clone this repository and open the `index.html` file in your browser to start using the interactive terminal.

```bash
git clone https://github.com/your-username/interactive-linux-terminal-resume.git
cd interactive-linux-terminal-resume
```

Then, open index.html in your favorite browser.

## Technologies Used
HTML/CSS: For structuring and styling the website.
JavaScript: For handling the terminal logic and simulating the file system.
Customization
Modify the fileSystem object in script.js to change the directories and files displayed in the terminal.
Customize the terminal appearance by editing the CSS in styles.css.
Contributing
Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

## License
This project is released under the free MIT License, which allows you to use, copy, modify, and distribute the software. 


