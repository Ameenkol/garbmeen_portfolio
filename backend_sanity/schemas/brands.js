export default{
    name:'brands',
    title:'Brands',
    type: 'document',
    fields:[
        {
            name:'imgUrl',
            title:'Image Url',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        {
            name:'name',
            title:'Name',
            type:'string'
        }
    ]
}