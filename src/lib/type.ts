import { z } from "zod";

const LeafSchema = <T extends z.ZodTypeAny>(valueSchema: T) => {
	return z.object({ value: valueSchema });
};

// type Leaf<T> = {
// 	[k in keyof z.objectUtil.addQuestionMarks<
// 		z.baseObjectOutputType<{
// 			value: z.ZodType<T, z.ZodTypeDef, T>;
// 		}>,
// 		any
// 	>]: z.objectUtil.addQuestionMarks<
// 		z.baseObjectOutputType<{
// 			value: z.ZodType<T, z.ZodTypeDef, T>;
// 		}>,
// 		any
// 	>[k];
// };

type Leaf<T> = z.infer<ReturnType<typeof LeafSchema<z.ZodType<T>>>>;
type Result = Leaf<number>;
