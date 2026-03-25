# CreateAuthApplicationResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allowed_hosts** | [**AllowedHosts**](AllowedHosts.md) |  | [optional] [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**auth_type** | [**AppAuthorizationType**](AppAuthorizationType.md) |  | [default to undefined]
**app_id** | **string** |  | [default to undefined]
**app_secret** | **string** |  | [default to undefined]

## Example

```typescript
import { CreateAuthApplicationResponse } from './api';

const instance: CreateAuthApplicationResponse = {
    allowed_hosts,
    name,
    description,
    auth_type,
    app_id,
    app_secret,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
