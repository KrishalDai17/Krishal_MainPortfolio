import { createClient } from "@/lib/supabase/server";
import { getQASection } from "@/lib/cms/content";
import { QAForm } from "@/components/admin/singletons";
import { QAProjectsEditor } from "@/components/admin/editors";
import { qaProjects } from "@/lib/data";

export default async function Page() {
  const [qa, supabase] = await Promise.all([
    getQASection(),
    createClient(),
  ]);

  const { data } = supabase
    ? await supabase.from("qa_projects").select("*").order("order_index")
    : { data: [] };

  const items = (data && data.length > 0)
    ? data
    : qaProjects.map((q, i) => ({
        id: `mock-qa-${i}`,
        title: q.title,
        project: q.project,
        testing_type: q.testingType,
        tools: q.tools,
        test_cases: q.testCases,
        bug_reports: q.bugReports,
        api_testing: q.apiTesting,
        database_testing: q.databaseTesting,
        result: q.result,
        order_index: i,
        published: true,
      }));

  return (
    <div className="space-y-12">
      <QAForm initial={qa} />
      <div className="border-t border-zinc-800 pt-8">
        <QAProjectsEditor items={items} />
      </div>
    </div>
  );
}
