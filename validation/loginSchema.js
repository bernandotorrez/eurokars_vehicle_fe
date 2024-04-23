import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const loginSchema = toTypedSchema(
    zod.object({
        username: zod.string().min(3, { message: "Minimal 3 Characters" }),
        password: zod.string().min(6, { message: "Minimal 6 Characters" }),
    })
);

export default loginSchema;