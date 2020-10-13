export const http_error = {
    404: {
        code: 'HTTP404',
        message: "Sorry! This site can't be reached"
    }
}

export const app_level = {
    APPAUTH001: {
        code: 'APPAUTH001',
        message: 'App token not found'
    },

    APPAUTH002: {
        code: 'APPAUTH002',
        message: 'Invalid app token'
    },

    APPLANG001: {
        code: 'APPLANG001',
        message: "Invalid language"
    },

    APPSUPPORT001: {
        code: 'APPSUPPORT001',
        message: "Doesn't match api version"
    },

    APPSUPPORT002: {
        code: 'APPSUPPORT002',
        message: "Doesn't support app platform"
    },

    APPSUPPORT003: {
        code: 'APPSUPPORT003',
        message: "Doesn't match environment"
    }
}

export const usrInfoErr = {
    USRINFO001: {
        code: 'USRINFO001',
        message: 'Invalid phone number format'
    }
}