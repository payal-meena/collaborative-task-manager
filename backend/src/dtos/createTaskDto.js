const { z } = require("zod");

const createTaskDto = z.object({
  title: z.string().max(100),
  description: z.string(),
  assignedToId: z.string(),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  dueDate: z.string()
});

module.exports = createTaskDto;
