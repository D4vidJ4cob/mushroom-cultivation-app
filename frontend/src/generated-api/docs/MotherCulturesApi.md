# MotherCulturesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**motherCultureControllerCreateMotherCulture**](#motherculturecontrollercreatemotherculture) | **POST** /api/mother-cultures | |
|[**motherCultureControllerDeleteMotherCultureById**](#motherculturecontrollerdeletemotherculturebyid) | **DELETE** /api/mother-cultures/{id} | |
|[**motherCultureControllerGetAllMotherCultures**](#motherculturecontrollergetallmothercultures) | **GET** /api/mother-cultures | |
|[**motherCultureControllerGetMotherCultureById**](#motherculturecontrollergetmotherculturebyid) | **GET** /api/mother-cultures/{id} | |
|[**motherCultureControllerUpdateMotherCultureById**](#motherculturecontrollerupdatemotherculturebyid) | **PUT** /api/mother-cultures/{id} | |

# **motherCultureControllerCreateMotherCulture**
> MotherCultureDetailResponseDto motherCultureControllerCreateMotherCulture(createMotherCultureRequestDto)


### Example

```typescript
import {
    MotherCulturesApi,
    Configuration,
    CreateMotherCultureRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new MotherCulturesApi(configuration);

let createMotherCultureRequestDto: CreateMotherCultureRequestDto; //

const { status, data } = await apiInstance.motherCultureControllerCreateMotherCulture(
    createMotherCultureRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createMotherCultureRequestDto** | **CreateMotherCultureRequestDto**|  | |


### Return type

**MotherCultureDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Create culture |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **motherCultureControllerDeleteMotherCultureById**
> motherCultureControllerDeleteMotherCultureById()


### Example

```typescript
import {
    MotherCulturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MotherCulturesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.motherCultureControllerDeleteMotherCultureById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


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
|**204** | Delete culture |  -  |
|**404** | Culture not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **motherCultureControllerGetAllMotherCultures**
> MotherCultureListResponseDto motherCultureControllerGetAllMotherCultures()


### Example

```typescript
import {
    MotherCulturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MotherCulturesApi(configuration);

const { status, data } = await apiInstance.motherCultureControllerGetAllMotherCultures();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MotherCultureListResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get all cultures |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **motherCultureControllerGetMotherCultureById**
> MotherCultureDetailResponseDto motherCultureControllerGetMotherCultureById()


### Example

```typescript
import {
    MotherCulturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MotherCulturesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.motherCultureControllerGetMotherCultureById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**MotherCultureDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Get culture by ID |  -  |
|**401** | Unauthorized - you need to be signed in |  -  |
|**404** | Culture not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **motherCultureControllerUpdateMotherCultureById**
> MotherCultureDetailResponseDto motherCultureControllerUpdateMotherCultureById(body)


### Example

```typescript
import {
    MotherCulturesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MotherCulturesApi(configuration);

let id: number; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.motherCultureControllerUpdateMotherCultureById(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**MotherCultureDetailResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Update culture |  -  |
|**400** | Invalid input data |  -  |
|**404** | Culture not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

