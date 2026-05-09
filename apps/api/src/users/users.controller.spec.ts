import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUser = {
  id: 'uuid-1',
  email: 'test@test.com',
  password: 'hashed',
  name: 'Test User',
  provider: 'local',
  isAdmin: false,
  sights: [],
  reviews: [],
  events: [],
  guides: [],
  photos: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUsersService = {
  create: jest.fn().mockResolvedValue(mockUser),
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto = {
        email: 'test@test.com',
        name: 'Test User',
        password: '123456',
      };
      const result = await controller.create(dto as any);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await controller.findOne('uuid-1');
      expect(service.findOne).toHaveBeenCalledWith('uuid-1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto = { name: 'Updated Name' };
      const result = await controller.update('uuid-1', dto as any);
      expect(service.update).toHaveBeenCalledWith('uuid-1', dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      await controller.remove('uuid-1');
      expect(service.remove).toHaveBeenCalledWith('uuid-1');
    });
  });
});
