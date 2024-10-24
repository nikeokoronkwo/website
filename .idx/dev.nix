{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_22
    pkgs.corepack_22
  ];

  # Sets environment variables in the workspace
  env = {
    DEBUG = false;
  };

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "Nuxtr.nuxt-vscode-extentions"
  ];

  idx.workspace.onCreate = {
    npm-install = "pnpm install";

    # Open on start
    default.openFiles = [ 
      "nuxt.config.ts"
      "app.vue"
      "pages/index.vue"
    ];
  };  

  # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "pnpm"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
          "--disable-host-check"
        ];
        manager = "web";
        # Optionally, specify a directory that contains your web app
        # cwd = "app/client";
      };
    };
  };
}