export default{
    name:'abouts',
    title:'About me',
    type: 'document',
    fields:[
        {
            name:'title',
            title:'Title',
            type:'string'
        },
        {
            name:'description',
            title:'Description',
            type:'string'
        },
        {
            name:'imgUrl',
            title:'Image Url',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        
    ]
}