using FraudDetection.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FraudDetection.Service
{
    public class MDRepository<T> where T : Entity, new()
    {
        IMongoDatabase _database;
        IMongoCollection<T> _collection;
        string _collectionName;
        public MDRepository()
        {
            _collectionName = "transactions";
            OpenConnection();
        }
        public MDRepository(string collectionName)
        {
            _collectionName = collectionName;
            OpenConnection();
        }

        private void OpenConnection()
        {
            var db = AppSettings.Get<string>("Database");
            var connectionString = AppSettings.Get<string>("ConnectionString");
            var client = new MongoClient(connectionString);

            _database = client.GetDatabase(db);
            _collection = _database.GetCollection<T>(_collectionName);
        }

        public bool InsertOne(T insertedObject)
        {
            insertedObject.CreatedAt = DateTime.Now;
            insertedObject.ModifiedAt = DateTime.Now;
            insertedObject.IsDeleted = false;
            _collection.InsertOne(insertedObject);
            return true;
        }

        public Task InsertOneAsync(T insertedObject)
        {
            return _collection.InsertOneAsync(insertedObject);
        }

        public bool InsertMany(List<T> insertedObjects)
        {
            foreach (var inserted in insertedObjects)
            {
                inserted.CreatedAt = DateTime.Now;
                inserted.ModifiedAt = DateTime.Now;
                inserted.IsDeleted = false;
            }
            _collection.InsertMany(insertedObjects);
            return true;
        }

        public Task InsertManyAsync(List<T> insertedObjects)
        {
            foreach (var inserted in insertedObjects)
            {
                inserted.CreatedAt = DateTime.Now;
                inserted.ModifiedAt = DateTime.Now;
                inserted.IsDeleted = false;
            }
            return _collection.InsertManyAsync(insertedObjects);
        }

        public T GetById(int id)
        {
            //var filter = Builders<T>.Filter.Eq("_id", id);
            //return _collection.Find(filter);
            return new T();
        }

        public IMongoQueryable<T> GetAll()
        {
            return _collection.AsQueryable<T>();
        }

        public List<T> GetAllList()
        {
            return _collection.AsQueryable<T>().ToList();
        }

        public List<T> Find(Expression<System.Func<T, bool>> filter)
        {
            var result = _collection.Find(filter).ToList();
            return result;
        }

        public void Update(Expression<System.Func<T, bool>> filter, UpdateDefinition<T> updateDefinition)
        {
            _collection.UpdateOne<T>(filter, updateDefinition);
        }
    }
}
