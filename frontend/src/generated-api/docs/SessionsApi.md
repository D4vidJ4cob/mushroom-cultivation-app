# SessionsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**sessionControllerSignIn**](#sessioncontrollersignin) | **POST** /api/sessions | |

# **sessionControllerSignIn**
> LoginResponseDto sessionControllerSignIn(loginRequestDto)


### Example

```typescript
import {
    SessionsApi,
    Configuration,
    LoginRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SessionsApi(configuration);

let loginRequestDto: LoginRequestDto; //

const { status, data } = await apiInstance.sessionControllerSignIn(
    loginRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequestDto** | **LoginRequestDto**|  | |


### Return type

**LoginResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | login |  -  |
|**400** | Invalid input data |  -  |
|**401** | Invalid credentials |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

