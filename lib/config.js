const fs = require('fs');
const path = require('path');
const prompts = require("prompts");

const CONFIG_FILE_PATH = path.join(__dirname, '/../config.json');
const defaultConfig = {
    'owner': '',
    'repository': '',
};

const config = (command = 'init') => {
    switch (command) {
        case 'view':
            console.log(read());
            break;
        case 'init':
            return init();
    }
};

const init = async () => {
    const answers = await prompts([
        {
            'type': 'text',
            'name': 'owner',
            'message': 'Github username',
            'initial': get('owner')
        },
        {
            'type': 'text',
            'name': 'repository',
            'message': 'Name of the repository you want to use now',
            'initial': get('repository')
        }
    ])
    write(answers);
};

const read = () => {
    try {
        const configData = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
        return JSON.parse(configData);
    } catch (error) {
        console.error('### Error reading config file:', error);
        return {};
    }
};

const write = (config) => {
    try {
        fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
        console.log('### Configuration saved successfully.');
    } catch (error) {
        console.error('### Error writing config file:', error);
    }
};

const get = (name) => {
    const config = read();

    return config[name];
};

module.exports = {
    init,
    read,
    write,
    get
};