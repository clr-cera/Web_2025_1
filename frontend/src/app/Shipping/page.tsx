import CartElement from "@/components/CartElement";

export default function ShippingPage() {
    // Objeto com os dados dinâmicos
    const shippingDetails = {
        fullName: "Diogo Silva",
        email: "DiogoSilva@email.com",
        address: "rua episcopal",
        city: "Sao Carlos",
        cep: "4839204",
        number: "49",
        total: 1925.5,
    };

    return (
        <div className="flex flex-col lg:flex-row pt-10 px-5 lg:px-20 gap-10 min-h-screen bg-background-blue text-black items-center">
            {/* Imagem do elemento */}
            <div className="lg:w-1/2 w-full flex flex-col self-start gap-5">
                <h2 className="text-xl font-semibold text-text-gray-darker">Order Summary</h2>
                <div className="flex flex-col justify-between self-center bg-white min-h-96 border-1 rounded-lg border-border-gray px-6 py-5 gap-4 transition-all duration-200 w-full">
                    <CartElement />
                    <div className="">
                        <div className="w-full h-px mb-4 bg-border-gray" />
                        <div className="w-full font-semibold flex justify-between">
                            <p>Total</p>
                            <p>{shippingDetails.total}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informações do elemento */}
            <div className="lg:w-1/2 w-full">
                <h2 className="text-xl font-semibold text-text-gray-darker">Shipping Details</h2>
                <div className="w-full flex flex-col gap-10">
                    <div className="flex flex-col gap-2 mt-5">
                        <h2 className="">Full Name</h2>
                        <input
                            type="text"
                            value={shippingDetails.fullName}
                            readOnly
                            className="w-full h-10 bg-white border border-border-gray rounded px-3 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2>Email</h2>
                        <input
                            type="text"
                            value={shippingDetails.email}
                            readOnly
                            className="w-full h-10 bg-white border border-border-gray rounded px-3 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2>Address</h2>
                        <input
                            type="text"
                            value={shippingDetails.address}
                            readOnly
                            className="w-full h-10 bg-white border border-border-gray rounded px-3 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2>City</h2>
                        <input
                            type="text"
                            value={shippingDetails.city}
                            readOnly
                            className="w-full h-10 bg-white border border-border-gray rounded px-3 outline-none"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-10">
                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                            <h2>CEP</h2>
                            <input
                                type="text"
                                value={shippingDetails.cep}
                                readOnly
                                className="w-full h-10 bg-white border border-border-gray rounded px-3 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:w-1/2">
                            <h2>Number</h2>
                            <input
                                type="text"
                                value={shippingDetails.number}
                                readOnly
                                className="w-full h-10 bg-white border border-border-gray rounded px-3 outline-none"
                            />
                        </div>
                    </div>

                    <div className="my-10">
                        <button className="bg-primary-blue text-white font-semibold rounded-md p-2 w-full cursor-pointer hover:bg-secondary-blue">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}