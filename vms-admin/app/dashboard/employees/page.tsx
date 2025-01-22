import AddDriverForm from "@/components/add-driver-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CarsPage() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Add an employee</CardTitle>
        </CardHeader>
        <CardContent>
          <AddDriverForm />
        </CardContent>
      </Card>
    </main>
  );
}
