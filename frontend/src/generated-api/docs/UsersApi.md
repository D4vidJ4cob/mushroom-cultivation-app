# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**userControllerDeleteUserById**](#usercontrollerdeleteuserbyid) | **DELETE** /api/users/{id} | |
|[**userControllerGetAllUsers**](#usercontrollergetallusers) | **GET** /api/users | |
|[**userControllerGetSubstrateAssignments**](#usercontrollergetsubstrateassignments) | **GET** /api/users/{id}/substrate-assignments | |
|[**userControllerGetUserById**](#usercontrollergetuserbyid) | **GET** /api/users/{id} | |
|[**userControllerRegisterUser**](#usercontrollerregisteruser) | **POST** /api/users | |
|[**userControllerUpdateUserById**](#usercontrollerupdateuserbyid) | **PUT** /api/users/{id} | |

# **userControllerDeleteUserById**
> userControllerDeleteUserById()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.userControllerDeleteUserById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Delete user |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetAllUsers**
> UserListResponseDto userControllerGetAllUsers()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.userControllerGetAllUsers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserListResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get all users |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetSubstrateAssignments**
> SubstrateListResponseDto userControllerGetSubstrateAssignments()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.userControllerGetSubstrateAssignments(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**SubstrateListResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get all the substrates that a user made |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerGetUserById**
> PublicUserResponseDto userControllerGetUserById()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.userControllerGetUserById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PublicUserResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get user by ID |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerRegisterUser**
> LoginResponseDto userControllerRegisterUser(registerUserRequestDto)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    RegisterUserRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let registerUserRequestDto: RegisterUserRequestDto; //

const { status, data } = await apiInstance.userControllerRegisterUser(
    registerUserRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerUserRequestDto** | **RegisterUserRequestDto**|  | |


### Return type

**LoginResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Register |  -  |
|**400** | Invalid input data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **userControllerUpdateUserById**
> PublicUserResponseDto userControllerUpdateUserById(updateUserRequestDto)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    UpdateUserRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let id: string; // (default to undefined)
let updateUserRequestDto: UpdateUserRequestDto; //

const { status, data } = await apiInstance.userControllerUpdateUserById(
    id,
    updateUserRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateUserRequestDto** | **UpdateUserRequestDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PublicUserResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Update user by ID |  -  |
|**400** | Invalid input data |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

