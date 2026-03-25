import axios from 'axios';

import
{
    AuthorizationApi,
    LicenseInfoApi,
    ProjectsApi,
    ReportsApi,
    UploadsApi,
    UserRolesApi,
    UsersApi,
    UserTagsApi,
    AuditLogsApi,
    RegistrationCodesApi,
} from './generated';
import { ACCESS_TOKEN_KEY } from '@/shared';

export const axiosInstance = axios.create();
const commonParameters = [undefined, import.meta.env.VITE_API_BASE_URL, axiosInstance];

const AuthApi = new AuthorizationApi(...commonParameters);

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await localStorage.getItem(ACCESS_TOKEN_KEY);
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) =>
    {
        return response;
    },
    (error) =>
    {
        if (error.response)
        {
            if (error.response.status === 401)
            {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
            }
        }
        else
        {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    },
);

export default {
    AuthorizationApi: AuthApi,
    UploadsApi: new UploadsApi(...commonParameters),
    ProjectsApi: new ProjectsApi(...commonParameters),
    UsersApi: new UsersApi(...commonParameters),
    ReportsApi: new ReportsApi(...commonParameters),
    UserRolesApi: new UserRolesApi(...commonParameters),
    LicenseInfoApi: new LicenseInfoApi(...commonParameters),
    UserTagsApi: new UserTagsApi(...commonParameters),
    AuditLogsApi: new AuditLogsApi(...commonParameters),
    RegistrationCodesApi: new RegistrationCodesApi(...commonParameters),
};
