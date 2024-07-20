import { definePage } from "#client";
import { Layout } from "#components";

export default definePage({
  handler: (req) => (
    <Layout>
      <div>
        <section className="flex flex-col items-center justify-center min-h-screen w-screen">
          <div className="flex flex-col items-center justify-center text-center px-5 content-center">
            <div className="font-bold font-mono text-3xl">What is this?</div>
            <div>
              <div className="text-gray-700 text-base max-w-screen-md">
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque eu ex ligula. Aliquam pellentesque ultrices laoreet.
                  Nam dapibus bibendum tellus in tincidunt. Pellentesque rutrum
                  dignissim feugiat. Sed sagittis mauris nec lectus fringilla,
                  sed finibus felis tristique. Mauris porttitor commodo
                  interdum. Phasellus tristique arcu nec metus molestie feugiat.
                  Aliquam ac orci tristique, pretium tellus eu, tincidunt
                  sapien. Pellentesque laoreet sit amet felis in consequat. Sed
                  at tristique neque. Nunc aliquam scelerisque ante, id sodales
                  sem sollicitudin a. Vestibulum sollicitudin ipsum at mauris
                  faucibus, sed fermentum mi aliquet. Maecenas vel massa non
                  purus feugiat blandit sit amet venenatis metus. Suspendisse
                  potenti.
                </p>
              </div>
              <div className="flex flex-row items-center justify-center space-x-6 pt-4">
                <button className="border-transparent">Projects</button>
                <button className="border-transparent">Blog</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  ),
});
