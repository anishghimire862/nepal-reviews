-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 19, 2020 at 05:41 PM
-- Server version: 10.3.27-MariaDB
-- PHP Version: 7.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nepal_reviews`
--

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `threadId` int(11) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `threadId`, `star`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 5, 5, '2020-07-26 15:36:45', '2020-07-26 15:51:08'),
(2, 5, 2, 3, '2020-07-26 16:36:49', '2020-07-26 16:36:49'),
(3, 4, 5, 3, '2020-07-26 16:37:21', '2020-07-26 16:37:21'),
(4, 3, 4, 3, '2020-07-26 16:38:24', '2020-07-26 16:38:27');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `threadId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `description`, `userId`, `threadId`, `createdAt`, `updatedAt`) VALUES
(1, 'Best price I could find, easy to order and make purchase, kept up dated about my order and a prompt delivery..', 5, 1, '2020-07-26 15:36:45', '2020-07-26 16:27:40'),
(2, 'This is very bad.', 3, 5, '2020-07-26 16:37:03', '2020-07-26 16:37:03'),
(3, 'pretty good...', 3, 4, '2020-07-26 16:37:35', '2020-07-26 16:38:00'),
(4, 'it is gooooooooood.', 3, 3, '2020-07-26 16:38:30', '2020-07-26 16:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `review_images`
--

CREATE TABLE `review_images` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `reviewId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review_images`
--

INSERT INTO `review_images` (`id`, `image`, `userId`, `reviewId`, `createdAt`, `updatedAt`) VALUES
(2, 'image-1595781455853.png', 3, 3, '2020-07-26 16:37:36', '2020-07-26 16:37:36'),
(3, 'image-1595781455859.png', 3, 3, '2020-07-26 16:37:36', '2020-07-26 16:37:36'),
(4, 'image-1595781510182.png', 3, 4, '2020-07-26 16:38:30', '2020-07-26 16:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `threads`
--

CREATE TABLE `threads` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `threads`
--

INSERT INTO `threads` (`id`, `title`, `description`, `category`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'Gooseberry Shop', 'I want to know more about Gooseberry Shop. Can anyone please tell me about the services offered by this business? How likely are you to recommend this to me...', 'Book', 3, '2020-07-26 15:33:51', '2020-07-26 16:20:29'),
(3, 'Abdabs Furniture ', 'Abdabs Furniture Reviews Abdabs Furniture ReviewsAbdabs Furniture Reviews Abdabs Furniture ReviewsAbdabs Furniture Reviews Abdabs Furniture ReviewsAbdabs Furniture Reviews Abdabs Furniture Reviews', 'Place', 5, '2020-07-26 16:32:28', '2020-07-26 16:32:28'),
(4, 'Saal-Digital', 'Saal-Digital Reviews Saal-Digital Reviews Saal-Digital Reviews Saal-Digital Reviews Saal-Digital Reviews Saal-Digital Reviews Saal-Digital Reviews ', 'Others', 5, '2020-07-26 16:34:08', '2020-07-26 16:34:08'),
(5, 'Aliexpress', 'Aliexpress Aliexpress Aliexpress Aliexpress Aliexpress Aliexpress Aliexpress Aliexpress Aliexpress Aliexpress Aliexpress Aliexpress', 'Others', 5, '2020-07-26 16:35:29', '2020-07-26 16:35:29');

-- --------------------------------------------------------

--
-- Table structure for table `thread_images`
--

CREATE TABLE `thread_images` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `threadId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `thread_images`
--

INSERT INTO `thread_images` (`id`, `image`, `userId`, `threadId`, `createdAt`, `updatedAt`) VALUES
(2, 'image-1595777631700.png', 3, 1, '2020-07-26 15:33:52', '2020-07-26 15:33:52'),
(3, 'image-1595777631705.png', 3, 1, '2020-07-26 15:33:52', '2020-07-26 15:33:52'),
(4, 'image-1595777630736.png', 3, 1, '2020-07-26 15:33:52', '2020-07-26 15:33:52'),
(5, 'image-1595781148327.png', 5, 3, '2020-07-26 16:32:28', '2020-07-26 16:32:28'),
(6, 'image-1595781248973.png', 5, 4, '2020-07-26 16:34:09', '2020-07-26 16:34:09'),
(7, 'image-1595781329792.png', 5, 5, '2020-07-26 16:35:30', '2020-07-26 16:35:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `name`, `createdAt`, `updatedAt`) VALUES
(3, 'anishghimire862@gmail.com', '$2b$10$TcYwqPnUhrgijmgHDDZ86Ovn2RTjI60LbM9q.k8CKKMoljTeGZqSe', 'anishghimire', 'Anish Ghimire', '2020-07-26 15:29:49', '2020-07-26 15:29:49'),
(5, 'krrishghimire@gmail.com', '$2b$10$sspvW5XSaezRXuBPVSzOKOMEqhVWA562fg6SV3vwCiJXOQcVkYcue', 'krrishghimire', 'Krrish Ghimire', '2020-07-26 15:36:18', '2020-07-26 15:36:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `threadId` (`threadId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `threadId` (`threadId`);

--
-- Indexes for table `review_images`
--
ALTER TABLE `review_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `reviewId` (`reviewId`);

--
-- Indexes for table `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `thread_images`
--
ALTER TABLE `thread_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `threadId` (`threadId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `review_images`
--
ALTER TABLE `review_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `threads`
--
ALTER TABLE `threads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `thread_images`
--
ALTER TABLE `thread_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`threadId`) REFERENCES `threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review_images`
--
ALTER TABLE `review_images`
  ADD CONSTRAINT `review_images_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `review_images_ibfk_2` FOREIGN KEY (`reviewId`) REFERENCES `reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `threads`
--
ALTER TABLE `threads`
  ADD CONSTRAINT `threads_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `thread_images`
--
ALTER TABLE `thread_images`
  ADD CONSTRAINT `thread_images_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `thread_images_ibfk_2` FOREIGN KEY (`threadId`) REFERENCES `threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
