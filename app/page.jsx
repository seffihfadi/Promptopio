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
      <p className="desc text-center">If you're tired of tedious and repetitive coding tasks and want to optimize your efficiency, you're in the right place. With the power of ChatGPT, you can streamline your workflow, reduce errors, and even gain insights on improving your code.</p>
      {/* feed  */}
      <Feed />
    </section>

  )
}

export default Home
