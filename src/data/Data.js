export const folderdata = {
  name: "root",
  folder: true,
  items: [
    {
      name: "public",
      folder: true,
      items: [
        {
          name: "App.js",
          folder: false,
        },
        {
          name: "MyComponent.js",
          folder: false,
        },
      ],
    },
    {
      name: "src",
      folder: true,
      items: [
        {
          name: "modules",
          folder: true,
          items: [
            {
              name: "user.js",
              folder: false,
            },
            {
              name: "profile.js",
              folder: false,
            },
            {
              name: "Auth.js",
              folder: false,
            },
          ],
        },
      ],
    },
    {
      name: "package.json",
      folder: false,
    },
    {
      name: "index.js",
      folder: false,
    },
    {
      name: "package-lock.json",
      folder: false,
    },
  ],
};

export default folderdata;
