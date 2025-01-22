import AddTaskForm from "@/components/add-task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CarsPage() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTaskForm />
        </CardContent>
      </Card>
    </main>
  );
}
