-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: aumiau
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `racas`
--

DROP TABLE IF EXISTS `racas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `racas` (
  `idraca` int NOT NULL AUTO_INCREMENT,
  `idespecie` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idraca`),
  KEY `fk_idespecie_idx` (`idespecie`),
  CONSTRAINT `fk_raca_idespecie` FOREIGN KEY (`idespecie`) REFERENCES `especies` (`idespecie`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `racas`
--

LOCK TABLES `racas` WRITE;
/*!40000 ALTER TABLE `racas` DISABLE KEYS */;
INSERT INTO `racas` VALUES (169,1,'Buldogue'),(170,1,'Galgo'),(171,1,'Pug'),(172,1,'Shih Tzu'),(173,1,'Golden Retriever'),(174,1,'Labrador'),(175,1,'Lhasa Apso'),(176,1,'Lulu da Pomerânia'),(177,1,'Maltês'),(178,1,'Pinscher'),(179,1,'Pit Bull'),(180,1,'Terrier'),(181,1,'Yorkshire'),(182,1,'Poodle'),(183,1,'sem raça definida'),(184,2,'Abssínio'),(185,2,'Angorá'),(186,2,'Bombaim'),(187,2,'Gato de Pelo Curto Inglês'),(188,2,'Gato-de-bengala'),(189,2,'Maine Coon'),(190,2,'Munchkin'),(191,2,'Persa'),(192,2,'Ragdoll'),(193,2,'Siamês'),(194,2,'Siberiano'),(195,2,'Sphynx'),(196,2,'sem raça definida');
/*!40000 ALTER TABLE `racas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-28 19:51:26
