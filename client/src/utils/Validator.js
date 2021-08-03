const validatorRequired = (name, value) => {
    if (!value) {
        return Promise.reject(new Error(`Vui lòng nhập ${name}`));
    }
    return Promise.resolve();
}

const validatorNumber = (name, value, min, max) => {
    if (!value) {
        return Promise.reject(new Error(`Vui lòng nhập ${name}`));
    } else {
        value = Number(value);
        if (!Number.isNaN(value)) {
            if (Number.isInteger(value)) {
                if (min) {
                    if (value < min) {
                        return Promise.reject(new Error(`${name} phải >= ${min}`));
                    }
                    if (value > max) {
                        return Promise.reject(new Error(`${name} phải <= ${max}`));
                    }
                }
                return Promise.resolve();
            }
        }
        return Promise.reject(new Error(`${name} phải là kí tự số`));
    }
}

export {
    validatorRequired,
    validatorNumber
}