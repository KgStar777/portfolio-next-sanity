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
      name: 'overview',
      type: 'string',
      title: 'Small Overview',
    },
    {
      name: 'link',
      type: 'string',
      title: 'Link',
    },
    {
      name: 'githab',
      type: 'string',
      title: 'Githab',
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