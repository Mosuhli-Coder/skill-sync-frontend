import { FaUnlock } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { SiEsbuild } from "react-icons/si";
import { IoExpandOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <section className="bg-gray-900 py-20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 lg:w-2/3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
                  SkillSync: Where Skills <br className="hidden md:block" />
                  <span className="text-indigo-500">
                    {" "}
                    Connect & Projects
                  </span>{" "}
                  Ignite
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
                  Learn. Teach. Collaborate. Grow.
                </p>
                <p className=" md:text-6xl  text-white  mb-6">
                  What is SkillSync?
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8">
                  SkillSync is a platform that connects individuals who want to
                  learn new skills with those who are eager to teach and share
                  their expertise. We believe that everyone has something
                  valuable to offer and that learning is most effective when
                  it's collaborative and project-based.
                </p>
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md"
                  >
                    Get Started
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
                <img
                  src="src/assets/Collabrative.png"
                  alt="Hero Image"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl lg:text-center flex flex-col justify-center items-center">
              <h2 className="text-base font-semibold leading-7 text-blue-100 bg-blue-600 px-3 rounded-lg uppercase mb-4 lg:mb-8">
                Benefits of Joining SkillSync
              </h2>
              <h1 className="lg:text-7xl text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center">
                Enhanced
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
                  Learning Platform
                </span>
              </h1>
              <p className="mt-6 text-md text-gray-600 max-w-lg text-center">
                Discover the exceptional benefits of our platform designed to
                help you upskill and with like-minded individuals
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700">
                      <FaUnlock />
                    </div>
                    Unlock New Skills
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Expand your knowledge base and gain valuable skills in a
                    supportive.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700">
                      <FaShare />
                    </div>
                    Share Your Expertise
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Make a real difference by mentoring others and passing on
                    your skills.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700">
                      <SiEsbuild />
                    </div>
                    Build Your Portfolio
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Gain practical experience by working on real-world projects
                    that you can showcase.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-700">
                      <IoExpandOutline />
                    </div>
                    Expand Your Network
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Connect with like-minded individuals, potential
                    collaborators, and future
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        <section
          id="works"
          className="relative bg-gray-500 py-10 sm:py-16 lg:py-24"
        >
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl text-white font-extrabold mx-auto md:text-6xl lg:text-5xl">
                How SkillSync Works?
              </h2>
              {/* <p className="max-w-2xl mx-auto mt-4 text-base text-gray-400 leading-relaxed md:text-2xl">
                Our AI solution will help you from start to finish
              </p> */}
            </div>
            <div className="relative mt-12 lg:mt-20">
              <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                <img
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="500"
                  decoding="async"
                  className="w-full"
                  style={{ color: "transparent" }}
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                />
              </div>
              <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                {[
                  {
                    step: "1",
                    title: "Create Your Profile",
                    description:
                      "Highlight the skills you want to learn and the ones you're excited to teach by updating your profile after a successful signing in",
                  },
                  {
                    step: "2",
                    title: "Find Your Match",
                    description:
                      "Our intelligent matching system connects you with compatible learning partners based on your skills, interests, and goals.",
                  },
                  {
                    step: "3",
                    title: "Start Collaborating",
                    description:
                      "Propose projects, share knowledge, and build something amazing together!",
                  },
                ].map(({ step, title, description }) => (
                  <div key={step}>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                      <span className="text-xl font-semibold text-gray-700">
                        {step}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">
                      {title}
                    </h3>
                    <p className="mt-4 text-base text-gray-400 md:text-lg">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
            style={{
              background:
                "radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)",
            }}
          ></div>
        </section>
        <section className="bg-gray-250">
          <div className="mx-auto py-16 sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden px-6 py-24 text-center sm:rounded-3xl sm:px-16">
              <h2 className="font-nudge-extrabold mx-auto max-w-2xl text-3xl font-bold uppercase tracking-wide sm:text-4xl">
                Ready to Dive In?
              </h2>
              <h1 className="lg:text-7xl text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
                Join our community now
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Experience the benefits of our community.
              </p>
              <div className="isolate mt-8 flex items-center justify-center -space-x-2 overflow-hidden">
                <img
                  className="relative z-30 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://randomuser.me/api/portraits/men/34.jpg"
                  alt=""
                />
                <img
                  className="relative z-20 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  alt=""
                />
                <img
                  className="relative z-10 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://randomuser.me/api/portraits/women/3.jpg"
                  alt=""
                />
                <img
                  className="relative z-0 inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://randomuser.me/api/portraits/men/4.jpg"
                  alt=""
                />
                <span className="!ml-2 font-bold italic text-teal-500">
                  Join these awesome members
                </span>
              </div>
              <div className="mt-12 flex items-center justify-center gap-x-6">
                <button
                  type="button"
                  className="text-md relative inline-flex items-center gap-x-2 rounded-lg bg-teal-600 px-6 py-4 font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  Join SkillSync Today - It's Free!
                  
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
