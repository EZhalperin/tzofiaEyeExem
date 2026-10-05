export interface Alert {
  id: number;
  displayName: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  arena: "North" | "South" | "Center";
  status: "Active" | "Handled";
  lon: number;
  lat: number;
}
