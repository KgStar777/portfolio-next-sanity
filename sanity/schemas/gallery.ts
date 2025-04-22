export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'titleRu',
      type: 'string',
      title: 'Title Ru',
    },
    {
      name: 'overview',
      type: 'string',
      title: 'Small Overview',
    },
    {
      name: 'overviewRu',
      type: 'string',
      title: 'Small Overview Ru',
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link',
    },
    {
      name: 'github',
      type: 'string',
      title: 'Github',
    },
    {
      name: "name",
      type: "string",
      title: "Name"
    },
    {
      name: 'gallery',
      type: 'document',
      title: 'Gallery',
      fields: [
        {
          name: 'images',
          type: 'array',
          options: {
            layout: 'grid'
          },
          of: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
            },
            {
              title: 'URL',
              name: 'urlObject',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'urlField',
                  type: 'url'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
}