import { definePage, Route } from "#client";
import { Layout } from "#components";

export default definePage({
  handler: (_req) => (
    <Layout>
      <div>
        <section className="flex flex-col items-center justify-center min-h-screen w-screen">
          <div className="flex flex-col items-center justify-center text-center px-5 content-center">
            <div className="font-bold font-mono text-5xl py-6">
              What is this?
            </div>
            <div>
              <div className="text-gray-700 text-base max-w-screen-md pb-5 border-b-2">
                <p className="m-0 flex flex-col space-y-1">
                  <span>
                    This is the personal website of Nikechukwu Okoronkwo, a
                    solo-developer (for now) enjoying what he does. I'm not
                    really into specializing in one field, so I'd call myself a
                    general programmer. I use different programming languages,
                    whatever gets the job done, but I mainly focus on embedded
                    software. When I'm not doing that, I'm usually working with
                    Dart and TypeScript via Deno. Most of the time I write code
                    to solve basic problems not only in the developer ecosystem
                    but also in the world in general.
                  </span>
                  <span>
                    On this website, you can find some of the projects I've
                    done, as well as the ones I'm currently working on. You can
                    also find my blog, where I'll share more of my experience in
                    detail and also topics that are important and are usually
                    suitable for discussion.
                  </span>
                  <span>
                    If you like what you see you can check this out on my GitHub
                    and support me (Patreon below).
                  </span>
                  <span>In the meantime, have fun! :)</span>
                </p>
              </div>
              <div className="flex flex-row items-center justify-center space-x-6 pt-4">
                <Route to="/projects">
                  <button className="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg">
                    Projects
                  </button>
                </Route>

                <Route to="/blog">
                  <button className="transition ease-in-out delay-150 duration-500 border rounded-lg border-transparent hover:border-primary-900 hover:shadow px-5 py-1 text-lg">
                    Blog
                  </button>
                </Route>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  ),
});
