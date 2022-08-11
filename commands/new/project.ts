import { Log } from "../../deps.ts";
import { templateNewProject } from "../../new/project/index.ts";
import { standardAction, Subcommand } from "../_helpers.ts";

const desc = 
`Initializes a new project repository from a template.

If you want to create a Render Blueprint (render.yaml) for an existing project, see \`render new blueprint\`.

You can initialize a project with any of the following identifiers:

repo-name
repo-name@gitref
user/repo-name
user/repo-name@gitref
github:user/repo-name
github:user/repo-name@gitref

If \`user\` is not provided, \`render-examples\` is assumed. If no source prefix is provided, \`github\` is assumed.

(Future TODO: enable \`gitlab:\` prefix, enable arbitrary Git repositories.)`;

export const newProjectCommand =
  new Subcommand()
    .name('project')
    .description(desc)
    .arguments<[string]>("<identifier:string>")
    .option("-o, --output-directory <path>", "target directory for new repo", { required: false })
    .option("-f, --force", "overwrites existing directory if found.")
    .option("--skip-cleanup", "skips cleaning up tmpdir (on success or failure)")
    .action((opts, identifier) =>
      standardAction({
        interactive: async (logger: Log.Logger): Promise<number> => {
          await templateNewProject({
            identifier,
            outputDir: opts.outputDirectory,
            force: opts.force,
            skipCleanup: opts.skipCleanup,
          });
          return 0;
        }
      }));
