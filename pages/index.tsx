import { definePage, h } from "#client";

export default definePage({
  handler: (req) => (
    <div>
      <header>
        <nav>
          <div>Homepage</div>
          <div>Projects</div>
        </nav>
      </header>
      <main>
        <div>
          <div>About Me</div>
          <div>
            <div>
              <div>Who</div>
              <div>Nikechukwu Okoronkwo</div>
            </div>
            <div>
              <div>What</div>
              <div>Website</div>
            </div>
            <div>
              <div>Where</div>
              <div>United States of America</div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  ),
});
