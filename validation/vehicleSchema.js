import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const vehicleSchema = toTypedSchema(
    zod.object({
        model: zod.string().min(3, { message: "Minimal 3 Characters" }),
        type: zod.string().min(3, { message: "Minimal 3 Characters" }),
        colour: zod.string().min(3, { message: "Minimal 3 Characters" }),
        fuel: zod.string().min(3, { message: "Minimal 3 Characters" }),
        chassis: zod.string().min(5, { message: "Minimal 5 Characters" }),
        engine_no: zod.string().min(5, { message: "Minimal 5 Characters" }),
        date_reg: zod.string().min(1, { message: "Required" }),
        curr: zod.string().min(2, { message: "Minimal 2 Characters" }),
        price: zod.number().min(5, { message: "Minimal 5 Digits" }),
    })
);

export default vehicleSchema;