import { Joi, celebrate } from "celebrate";

export const CreateSourceValidator = celebrate(
    {
      body: {
        name: Joi.string().alphanum().min(2).max(30).required()
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