import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable/data-table";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dataService } from "@/services/dataService";
import axios from "axios";

const fetchData = async () => {
  return axios.get(
    "https://script.google.com/macros/s/AKfycbx-IHfmCLu265z22d38-A-F-ZcQEBSmBesbOa1Z-d8dnZfzoPW36tIvQWygvjRF3hr7/exec"
  );
};

export default async function Home() {
  const { data } = await fetchData();

  const organizedData = dataService.organizeData(data);

  console.log(organizedData[0]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="Raspored">
        <TabsList>
          {data.map((sheet: any) => (
            <TabsTrigger
              key={sheet.sheetName + "tab-trigger"}
              value={sheet.sheetName}
            >
              {sheet.sheetName}{" "}
            </TabsTrigger>
          ))}
        </TabsList>

        {data.map((sheet: any) => (
          <TabsContent
            key={sheet.sheetName + "tab-content"}
            value={sheet.sheetName}
          >
            <DataTable
              columns={organizedData[0].columns}
              data={organizedData[0].sheetData}
            />
          </TabsContent>
        ))}
      </Tabs>
      <ModeToggle />

      <Button>test</Button>
    </main>
  );
}
