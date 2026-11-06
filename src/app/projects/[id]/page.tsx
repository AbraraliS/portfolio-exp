import { ExternalLink, FileText, Github, Play } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { postsForProject } from "@/../utils/Data/posts";
import { projectsData } from "@/../utils/Data/projects-data";
import { getProjectImages } from "@/../utils/get-project-images";
import {
  flowStops,
  lineLabels,
  originLabels,
  projectLiveUrl,
  projectName,
  projectSourceUrl,
  projectsInOrder,
  projectSubtitle,
  projectYear,
  youTubeId,
} from "@/../utils/project-helpers";
import { breadcrumbJsonLd, lineStyle, shareMeta } from "@/../utils/site";
import JsonLd from "@/app/components/site/JsonLd";
import Gallery from "@/app/components/projects/Gallery";
import RouteDiagram from "@/app/components/projects/RouteDiagram";
import VideoFacade from "@/app/components/projects/VideoFacade";

type Props = { params: Promise<{ id: string }> };

const findProject = (id: string) =>
  projectsData.find((project) => String(project.id) === id);

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: String(project.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = findProject(id);
  if (!project) return {};
  const title = project.fullName ?? project.name;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    ...shareMeta({
      title,
      description: project.description,
      path: `/projects/${project.id}`,
      image: project.thumbnail,
    }),
  };
}

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="detail-block">
    <h2>{title}</h2>
    {children}
  </section>
);

const Points = ({ items }: { items: string[] }) => (
  <ul className="points">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = findProject(id);
  if (!project) notFound();

  const name = projectName(project);
  const subtitle = projectSubtitle(project);
  const images = getProjectImages(project.images ?? []);
  const lead =
    project.thumbnail && images.includes(project.thumbnail)
      ? project.thumbnail
      : images[0];
  const architecture = project.system_architecture;
  const stops = flowStops(architecture?.flow);
  const pipelineDuplicatesFlow = project.pipeline?.join() === stops.join();
  const live = projectLiveUrl(project);
  const source = projectSourceUrl(project);
  const video = project.videos?.[0];
  const videoId = video ? youTubeId(video) : null;

  const ordered = projectsInOrder();
  const next =
    ordered[
      (ordered.findIndex((p) => p.id === project.id) + 1) % ordered.length
    ];

  const articles = postsForProject(project.id);

  const facts: [string, string | undefined][] = [
    ["My role", project.role],
    ["Origin", originLabels[project.origin]],
    ["Year", projectYear(project)],
    ["Type", project.type],
    ["Discipline", lineLabels[project.line]],
    ["Status", project.status],
  ];

  return (
    <article className="detail" style={lineStyle(project.line)}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name, path: `/projects/${project.id}` },
        ])}
      />
      <header className="page-head detail-head">
        <div className="page-head-inner">
          <Link href="/projects" className="detail-back">
            All projects
          </Link>
          <h1>{name}</h1>
          {subtitle && <p className="detail-subtitle">{subtitle}</p>}
          <p>{project.description}</p>
          <div className="detail-actions">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-signal"
              >
                Open live demo <ExternalLink aria-hidden="true" />
              </a>
            )}
            {source && (
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Github aria-hidden="true" /> View source
              </a>
            )}
            {video && (
              <a
                href={video}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Play aria-hidden="true" /> Watch on YouTube
              </a>
            )}
            {project.docs && (
              <a
                href={project.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <FileText aria-hidden="true" /> Read the docs
              </a>
            )}
          </div>
          {!live && !source && (
            <p className="detail-note">
              The source for this project isn't public. Contact me to talk
              through how it works.
            </p>
          )}
        </div>
      </header>

      <div className="detail-shell">
        {lead && (
          <div className="detail-lead">
            <Image
              src={lead}
              alt={`${name} screenshot`}
              fill
              priority
              sizes="(min-width: 1320px) 1240px, 100vw"
            />
          </div>
        )}

        <div className="detail-grid">
          <aside className="detail-aside">
            <dl className="detail-facts">
              {facts
                .filter((fact): fact is [string, string] => !!fact[1])
                .map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
            </dl>
            {project.originNote && (
              <p className="detail-origin-note">{project.originNote}</p>
            )}
            {project.tools && (
              <>
                <h2>Stack</h2>
                <ul className="card-tools">
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </>
            )}
            {articles.length > 0 && (
              <>
                <h2>Related writing</h2>
                <ul className="detail-articles">
                  {articles.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Link href="/contact" className="btn btn-ink">
              <span>Discuss this project</span>
            </Link>
          </aside>

          <div className="detail-main">
            {architecture && (
              <Block title="How it works">
                <p className="detail-kicker">{architecture.type}</p>
                <RouteDiagram stops={stops} label={`${name} system flow`} />
                <h3>Main components</h3>
                <Points items={architecture.components} />
              </Block>
            )}

            {project.pipeline && !pipelineDuplicatesFlow && (
              <Block title={`${project.pipeline.length}-stage pipeline`}>
                <RouteDiagram
                  stops={project.pipeline}
                  label={`${name} pipeline`}
                />
              </Block>
            )}

            {project.features && (
              <Block title="Features">
                <Points items={project.features} />
              </Block>
            )}

            {project.highlights && (
              <Block title="Highlights">
                <Points items={project.highlights} />
              </Block>
            )}

            {project.core_systems && (
              <Block title="Core systems">
                <h3>Upload pipeline</h3>
                <RouteDiagram
                  stops={flowStops(project.core_systems.upload_pipeline)}
                  label="Upload pipeline"
                />
                <h3>Cache hierarchy</h3>
                <RouteDiagram
                  stops={flowStops(project.core_systems.cache_hierarchy)}
                  label="Cache hierarchy"
                />
                <h3>Search</h3>
                <p>{project.core_systems.search}</p>
              </Block>
            )}

            {(project.security || project.performance) && (
              <div className="detail-pair">
                {project.security && (
                  <Block title="Security">
                    <Points items={project.security} />
                  </Block>
                )}
                {project.performance && (
                  <Block title="Performance">
                    <Points items={project.performance} />
                  </Block>
                )}
              </div>
            )}

            {project.capabilities && (
              <Block title="Capabilities">
                <Points items={project.capabilities} />
              </Block>
            )}

            {project.deployment && (
              <Block title="Deployment">
                <p>Runs on {project.deployment.platforms.join(", ")}.</p>
                <Points items={project.deployment.highlights} />
              </Block>
            )}

            {project.analytics && (
              <Block title="Analytics">
                <p>{project.analytics.description}</p>
                <Points items={project.analytics.features} />
              </Block>
            )}

            {video && videoId && (
              <Block title="Video demo">
                <VideoFacade videoId={videoId} title={`${name} demo`} />
              </Block>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <section className="detail-block detail-gallery">
            <h2>Screens</h2>
            <Gallery images={images} name={name} />
          </section>
        )}

        <Link href={`/projects/${next.id}`} className="next-stop">
          <span>Next project</span>
          <strong>{projectName(next)}</strong>
        </Link>
      </div>
    </article>
  );
}
