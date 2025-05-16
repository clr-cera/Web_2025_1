export default function Page() {
    return (
        <div className="bg-background-gray w-full h-screen text-black">
            <div className="absolute top-1/2 left-1/2 bg-white border-2 shadow border-border-gray rounded-md p-10 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-auto translate-x-[-50%] translate-y-[-50%] flex gap-2 flex-col items-center">
                <h1 className="font-medium text-2xl text-center">Welcome Back</h1>
                <p className="font-medium text-text-gray text-center">Enter your credentials to access your account</p>
                <form className="self-start flex flex-col w-full gap-5 mt-10">
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Email</p>
                        <input
                            type="email"
                            placeholder="name@email.com"
                            className="border-2 border-border-gray rounded-md p-2 w-full mb-4"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Password</p>
                        <input
                            type="password"
                            placeholder="********"
                            className="border-2 border-border-gray rounded-md p-2 w-full mb-4"
                        />
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2 w-6 h-6" />
                        <label className="font-semibold">Login as Admin</label>
                    </div>

                    <div className="mt-10">
                        <button className="bg-primary-blue text-white font-semibold rounded-md p-2 w-full cursor-pointer hover:bg-secondary-blue">
                            Login
                        </button>
                    </div>

                    <div>
                        <p className="font-medium text-text-gray text-center mt-10">
                            Don't have an account?{" "}
                            <a href="/register" className="text-primary-blue">
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}