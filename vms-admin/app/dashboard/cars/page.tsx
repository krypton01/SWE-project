import AddCarForm from "@/components/add-car-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CarsPage() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>New car</CardTitle>
        </CardHeader>
        <CardContent>
          <AddCarForm/>
        </CardContent>
      </Card>
    </main>
  );
}
