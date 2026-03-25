# AuthApplicationResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allowed_hosts** | [**AllowedHosts**](AllowedHosts.md) |  | [optional] [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**auth_type** | [**AppAuthorizationType**](AppAuthorizationType.md) |  | [default to undefined]
**app_id** | **string** |  | [default to undefined]
**owner_user_id** | **string** |  | [default to undefined]

## Example

```typescript
import { AuthApplicationResponse } from './api';

const instance: AuthApplicationResponse = {
    allowed_hosts,
    name,
    description,
    auth_type,
    app_id,
    owner_user_id,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
