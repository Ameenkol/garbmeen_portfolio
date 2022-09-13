export default {
    name: "testimonials",
    title: "Testimonials",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Full name",
            type: "string"
        },
        {
            name: "company",
            title: "Company name",
            type: "string"
        },
        {
            name: "imgurl",
            title: "Image Url",
            type: "image",
            options: {
                hotspot: true
            }
        },
        {
            name: "feedback",
            Title: "Feedback",
            type: "string"
        }
    ]
}