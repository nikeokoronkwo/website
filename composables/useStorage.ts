import { Dropbox } from 'dropbox';
import path from 'path-browserify';

export default () => {
    const {public: config} = useRuntimeConfig();

    const dropbox = new Dropbox({
        accessToken: config.dropboxToken ?? '',
        fetch: fetch,
    });

    async function installLink(name: string) {
        const {result: files} = await dropbox.filesListFolder({path: name});
        if (files.entries.length === 0) throw new Error(`There is no file to download for ${name}`);

        const file = files.entries[0];

        const {result: fileInfo} = await dropbox.filesGetTemporaryLink({path: file.path_lower!});

        return fileInfo.link;
    }

    async function install(name: string): Promise<void> {
        const {result: files} = await dropbox.filesListFolder({path: name});
        if (files.entries.length === 0) throw new Error(`There is no file to download for ${name}`);

        const file = files.entries[0];

        const {result: fileInfo} = await dropbox.filesGetTemporaryLink({path: file.path_lower!});

        const link = fileInfo.link;
        
        if (window) {
            const el = document.createElement('a');
            el.href = link;
            el.download = path.basename(file.path_lower!);
            el.click();
        }
    }

    return {
        install,
        installLink,
    }
}