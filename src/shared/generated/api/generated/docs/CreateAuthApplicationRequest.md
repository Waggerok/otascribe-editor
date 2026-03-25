# CreateAuthApplicationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allowed_hosts** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**auth_type** | [**AppAuthorizationType**](AppAuthorizationType.md) |  | [default to undefined]

## Example

```typescript
import { CreateAuthApplicationRequest } from './api';

const instance: CreateAuthApplicationRequest = {
    allowed_hosts,
    name,
    description,
    auth_type,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
