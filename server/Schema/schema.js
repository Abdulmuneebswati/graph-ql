
const { GraphQLObjectType, GraphQLString, GraphQLID, graphql, GraphQLSchema, GraphQLList, GraphQLNonNull } = require("graphql");
const Clients = require("../models/client");
const Projects = require("../models/project");
const { default: mongoose } = require("mongoose");




const ProjectType = new GraphQLObjectType({
    name:"Project",
    fields:()=>({
        id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client:{
        type:ClientType,
        resolve(parent,args){
            return Clients.findById(parent.id)
        }
    }
    })
})

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    }),
  });


const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(parent,args){
                return Projects.find();
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Projects.findById(args.id)
            }
        },
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parent,args){
                return Clients.find();
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Clients.findById(args.id)
            }
        }
    }
})


// mutations
const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addClient:{
            type:ClientType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                email:{type:GraphQLNonNull(GraphQLString)},
                phone:{type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                const client = new Clients({
                    name:args.name,
                    email:args.email,
                    phone:args.phone
                })
                return client.save();
            }
        },
        deleteClient:{
            type:ClientType,
            args:{id:{type:  GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                return  Clients.findByIdAndDelete(args.id)
            
            }
        }
        
    }
})










module.exports =  new GraphQLSchema({
    query:RootQuery,
    mutation
})