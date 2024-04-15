import { Joi, celebrate } from "celebrate";

export const CreateUpdateSourceValidator = celebrate(
    {
      body: {
        name: Joi.string().min(2).max(50).required()
      }
    },
    { stripUnknown: true },
)

export const CreateUpdateEndpointValidator = celebrate(
    {
      body: {
        url: Joi.string().uri().required()
      }
    },
    { stripUnknown: true },
)

export const SubscribeEndpointValidator = celebrate(
    {
        body: {
            sourceId: Joi.string().required()
        }
    },
    { stripUnknown: true },
)