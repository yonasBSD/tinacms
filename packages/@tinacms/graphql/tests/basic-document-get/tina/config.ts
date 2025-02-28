import { Schema } from '@tinacms/schema-tools';

export const schema: Schema = {
  collections: [
    {
      name: 'post',
      path: '',
      fields: [
        {
          type: 'string',
          name: 'title',
        },
      ],
    },
  ],
};

export default { schema };
