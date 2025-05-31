import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DiagnosisResult({ result }) {
  if (!result) return null;
  const { disease, cause, cure, recovery, curable } = result;

  return (
    <Card className="bg-white border shadow">
      <CardHeader className="text-2xl font-semibold text-[#103713]">
        🩺 Diagnosis Result
      </CardHeader>
      <CardContent className="space-y-4 text-[#103713]">
        <p>
          <span className="font-medium">Disease:</span> {disease}
        </p>
        <p>
          <span className="font-medium">Cause:</span> {cause}
        </p>
        <div>
          <p className="font-medium mb-1">Recommended Cure:</p>
          <ul className="list-disc list-inside space-y-1">
            {cure.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>

        {curable ? (
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4" /> Estimated recovery time:{" "}
            <span className="font-medium">{recovery}</span>
          </p>
        ) : (
          <p className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-4 h-4" />
            This disease is usually not recoverable. Consider removing affected
            plants.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
