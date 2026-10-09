$(document).ready(function () {

    const products = [
        {
            name: "Portable Seawater Desalination Unit",
            image: "img/PORTABLE-SEAWATER-DESALINATION-UNIT.png",
            link: "seawater_desalination_systems.html"
        },
        {
            name: "Centrifugal Process Pump",
            image: "img/CENTRIFUGAL-PROCESS-PUMP.png",
            link: "#"
        },
        {
            name: "Stainless Steel High-Pressure Fittings",
            image: "img/STAINLESS-STEEL-HIGH-PRESSURE-FITTINGS.png",
            link: "#"
        },
        {
            name: "Drum Pump",
            image: "img/DRUM-PUMP.png",
            link: "#"
        },
        {
            name: "Hydro Testing Pump",
            image: "img/HYDRO-TESTING-PUMP.png",
            link: "#"
        },
        {
            name: "Hand-Operated Hydro Testing Pump",
            image: "img/HAND-OPERATED-HYDRO-TESTING-PUMP.png",
            link: "#"
        },
        {
            name: "Engine-Driven Hydro Testing Pump",
            image: "img/ENGINE-DRIVEN-HYDRO-TESTING-PUMP.png",
            link: "#"
        },
        {
            name: "High-Pressure Triplex Plunger Pump",
            image: "img/HIGH-PRESSURE-TRIPLEX-PLUNGER-PUMP.png",
            link: "#"
        },
        {
            name: "Triplex Plunger Pump",
            image: "img/TRIPLEX-PLUNGER-PUMP.png",
            link: "#"
        },
        {
            name: "Hydro Jetting Pump",
            image: "img/HYDRO-JETTING-PUMP.png",
            link: "#"
        },
        {
            name: "Air-Operated Double Diaphragm (AODD) Pump",
            image: "img/AIR-OPERATED-DOUBLE-DIAPHRAGM-AODD-PUMP.png",
            link: "#"
        },
        {
            name: "High-Pressure Valves",
            image: "img/HIGH-PRESSURE-VALVES.png",
            link: "#"
        },
        {
            name: "High-Pressure Triplex Hydro Test Pump",
            image: "img/HIGH-PRESSURE-TRIPLEX-HYDRO-TEST-PUMP.png",
            link: "#"
        },
        {
            name: "Pneumatically Driven Hydro Test Pump",
            image: "img/PNEUMATICALLY-DRIVEN-HYDRO-TEST-PUMP.png",
            link: "#"
        },
        {
            name: "High-Pressure Plunger Pump",
            image: "img/HIGH-PRESSURE-PLUNGER-PUMP.png",
            link: "#"
        },
        {
            name: "Magnetically Driven Polypropylene (PP) Pump",
            image: "img/MAGNETICALLY-DRIVEN-POLYPROPYLENE-PP-PUMP.png",
            link: "amtmd-series-magnetic-drive-polypropylene-pump.html"
        },
        {
            name: "Polypropylene (PP) Process Pump",
            image: "img/POLYPROPYLENE-PP-PROCESS-PUMP.png",
            link: "amtmd-series-magnetic-drive-polypropylene-pump.html"
        },
        {
            name: "PP Process Pump",
            image: "img/PP-PROCESS-PUMP.png",
            link: "amttp-series-polypropylene-process-pump.html"
        },
        {
            name: "Sanitary Process Pump",
            image: "img/SANITARY-PROCESS-PUMP.png",
            link: "#"
        },
        {
            name: "Gas Cylinder Hydro Testing System",
            image: "img/GAS-CYLINDER-HYDRO-TESTING-SYSTEM.png",
            link: "#"
        },
        {
            name: "Engine-Driven Hydro Pressure Testing Pump",
            image: "img/ENGINE-DRIVEN-HYDRO-PRESSURE-TESTING-PUMP.png",
            link: "#"
        },
        {
            name: "Vertical PP Process Pump",
            image: "img/VERTICAL-PP-PROCESS-PUMP.png",
            link: "#"
        },
        {
            name: "Agricultural Pump",
            image: "img/AGRICULTURAL-PUMP.png",
            link: "#"
        },
        {
            name: "Monoblock Mud Pump",
            image: "img/MONOBLOCK-MUD-PUMP.png",
            link: "#"
        },
        {
            name: "Self-Priming SS 316 Process Pump",
            image: "img/SELF-PRIMING-SS-316-PROCESS-PUMP.png",
            link: "#"
        },
        {
            name: "Monoblock SS 316 Process Pump",
            image: "img/MONOBLOCK-SS-316-PROCESS-PUMP.png",
            link: "#"
        },
        {
            name: "Mechanical Seal",
            image: "img/MECHANICAL-SEAL.png",
            link: "#"
        },
        {
            name: "Gear Pump",
            image: "img/GEAR-PUMP.png",
            link: "#"
        },
        {
            name: "PP Monoblock Process Pump",
            image: "img/PP-MONOBLOCK-PROCESS-PUMP.png",
            link: "#"
        },
        {
            name: "Slurry Pump",
            image: "img/SLURRY-PUMP.png",
            link: "#"
        }
    ];

    const slider = $("#products-slider");

    // Generate all product cards automatically
    slider.html(
        products.map(function (product, index) {
            return `
                <div class="item">
                    <a href="${product.link}" class="product-card">
                        <span class="number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                        <div class="image-area">
                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                loading="lazy">
                        </div>

                        <div class="content">
                            <h5>${product.name}</h5>
                        </div>
                    </a>
                </div>
            `;
        }).join("")
    );

    // Initialize continuously moving Owl Carousel
    slider.owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        smartSpeed:800,
        paginationSpeed: 400,
        items:5,
        autoplay: true,
        margin:24,
        dots: false,
        nav:true,
        loop: true,
        slideTransition: 'linear',
        autoplaySpeed: 15000,
        // autoplayHoverPause:true,
        // stopOnHover:true,
        pauseOnHover: true,
        // autoplay:false,
        // autoplayTimeout:5000,
        autoplayHoverPause:true,

        navText: [
            '<img src="./img/left-arrow.svg" class="left-icon"/>',
            '<img src="./img/right-arrow.svg" class="right-icon">'
                // '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
                // '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            1280: {
                margin:30
            },
            1024: {
                items:4,
                margin:20
            },
            768: {
                items:3,
                margin:20
            },
            640: {
                items:2,
                margin:20
            },
            480: {
                items:2,
                margin:20
            },
            360: {
                items:1,
                margin:20
            },
            320: {
                items:1,
                margin:10

            }

        }

    });

});
