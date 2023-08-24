import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="flex flex-col flex-center">
      <h1 className="head_text text-center">
        Discover & Share&nbsp;
        <br className="flex md:hidden" />
        <span className="orange_gradient text-center">
          AI Powerd Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati corrupti rerum nihil praesentium blanditiis iure optio maxime quod. Optio quos aspernatur doloribus, alias ad quidem minus aliquid impedit. Accusantium, numquam.
      </p>
      {/* feed  */}
      <Feed />
    </section>

  )
}

export default Home
