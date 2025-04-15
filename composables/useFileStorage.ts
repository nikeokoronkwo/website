import { head, list } from "@vercel/blob";
import { extname } from "path-browserify";

type Platform = 'windows' | 'macos' | 'linux';

export interface DownloadFile {
  name: string;
  platform: Platform;
  version: string;
  architecture: 'x64' | 'arm' | string;
  language?: string;
  url: URL;
  filename: string;
}

function getPlatformFromFile(pathname: string, contentType?: string): Platform {
  // check content type first
  if (contentType) {
    let p: Platform | undefined;
    switch (contentType) {
      case 'application/x-msdownload':
        p = 'windows';
      // TODO: more as they come
    }
    if (p) return p;
  }

  const extension = extname(pathname);
  switch (extension) {
    case 'msi':
      return 'windows'
    case 'dmg':
      return 'macos'
    // TODO: Linux
    default:
      return 'windows'
  }
}

function parseDownloadFile(rawName: string, url: string, platform: Platform): DownloadFile {
  const parts = rawName.split('_');

  // first part is name
  const name = parts[0];
  const version = parts[1];
  const arch = parts[2];
  const language = parts[3];

  return {
    filename: rawName,
    name,
    version,
    architecture: arch,
    language,
    url: new URL(url),
    platform
  }
}

export default () => {
  // const downloadFiles = ref<DownloadFile[]>([]);

  // function getDownloadFile(project: string, architecture: Platform) {
  //   return downloadFiles.value.find(d => d.name === project && d.platform === architecture);
  // }

  // onMounted(async () => {
  //   const { blobs } = await list();
  //   downloadFiles.value = blobs.map(b => {
  //     // const { contentType } = await head(b.pathname);
  //     const dFile = parseDownloadFile(b.pathname, b.downloadUrl, getPlatformFromFile(b.pathname));
  //     return dFile;
  //   })
  // })

  // return {
  //   downloadFiles,
  //   getDownloadFile
  // }
};
