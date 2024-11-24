import { Dropbox, DropboxResponseError } from "dropbox";
import path from "path-browserify";

export default () => {
  const { public: config } = useRuntimeConfig();

  const dropbox = new Dropbox({
    accessToken: config.dropboxToken ?? "",
  });

  async function installLink(name: string) {
    try {
      const { result: files } = await dropbox.filesListFolder({
        path: `/${name}`,
      });
      if (files.entries.length === 0)
        throw new Error(`There is no file to download for ${name}`);

      const file = files.entries[0];

      const { result: fileInfo } = await dropbox.filesGetTemporaryLink({
        path: file.path_lower!,
      });

      return fileInfo.link;
    } catch (e) {
      if (e instanceof DropboxResponseError) {
        console.error(e.error);
        console.error(e.headers);
        console.error(e.status);

        console.info(e);
      }
    }
  }

  async function install(name: string): Promise<boolean> {
    try {
      const { result: files } = await dropbox.filesListFolder({
        path: `/${name}`,
      });
      if (files.entries.length === 0)
        throw new Error(`There is no file to download for ${name}`);

      const file = files.entries[0];

      const { result: fileInfo } = await dropbox.filesGetTemporaryLink({
        path: file.path_lower!,
      });

      const link = fileInfo.link;

      if (window) {
        const el = document.createElement("a");
        el.href = link;
        el.download = path.basename(file.path_lower!);
        el.click();
      }

      return true;
    } catch (e) {
      if (e instanceof DropboxResponseError) {
        if (e.error.error) {
          if (e.error.error_summary === "path/not_found/.")
            throw new Error("The given file does not exist");
        } else {
          //   throw e;
        }
      }
    }
    return false;
  }

  return {
    install,
    installLink,
  };
};
